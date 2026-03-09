import { useMemo, useState, useEffect } from 'react';
import Gantt, { ViewMode, Timeline } from 'react-modern-gantt';
import type { TimelineHeaderRenderProps } from 'react-modern-gantt';
// ⚠️ IMPORTANT: Don't forget to import the styles!
import 'react-modern-gantt/dist/index.css';
import { addMonths, subMonths, addDays, startOfWeek, format } from 'date-fns';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { GET_JOBS } from '../graphql/jobs';
import { GET_RFPS } from '../graphql/queries';
import { GET_BIDS_FOR_RFP } from '../graphql/bidsForRFP';
import apolloClient from '../graphql/client';
import { useThemeMode } from './ThemeModeContext';

type Task = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  percent?: number;
};

type TaskGroup = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
};

export default function GanttChart(props: {
  tasks?: TaskGroup[];
  startDate?: Date;
  endDate?: Date;
}) {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const parseDate = (val?: string | number | null): Date | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') {
      const d = new Date(val);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    if (typeof val === 'string') {
      const t = val.trim();
      if (/^\d+$/.test(t)) {
        const d = new Date(parseInt(t, 10));
        return Number.isNaN(d.getTime()) ? null : d;
      }
      const d = new Date(t);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(val as any);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  const sampleTasks: TaskGroup[] = [
    {
      id: 'team-1',
      name: 'Engineering',
      description: 'Development Team',
      tasks: [
        {
          id: 'task-1',
          name: 'Website Redesign',
          startDate: new Date(2023, 0, 1),
          endDate: new Date(2023, 2, 15),
          color: '#3b82f6',
          percent: 75,
        },
        {
          id: 'task-2',
          name: 'API Work',
          startDate: new Date(2023, 1, 1),
          endDate: new Date(2023, 3, 1),
          color: '#10b981',
          percent: 40,
        },
      ],
    },
  ];

  const [internalTasks, setInternalTasks] = useState<TaskGroup[]>(props.tasks ?? sampleTasks);

  type Job = {
    id: string;
    title: string;
    startDate?: string | null;
    daysExpected?: number | null;
    company?: string | null;
  };

  const { data } = useQuery<{ jobs: Job[] }>(GET_JOBS);

  const mappedFromJobs = useMemo<TaskGroup[] | null>(() => {
    if (!data || !data.jobs) return null;
    const group: TaskGroup = {
      id: 'jobs-group',
      name: 'Jobs',
      description: 'Jobs from database',
      tasks: data.jobs.map(j => {
        const parsedStart = parseDate(j.startDate);
        const start = parsedStart ?? new Date();
        const days = j.daysExpected ?? 1;
        const end = addDays(start, Math.max(1, days));
        const t: any = {
          id: `job-${j.id}`,
          name: j.title ?? `Job ${j.id}`,
          startDate: start,
          endDate: end,
          color: '#3b82f6',
          percent: 0,
        } as Task;
        t.company = j.company ?? 'Unknown Company';
        return t as Task;
      }),
    };
    return [group];
  }, [data]);

  // NOTE: internalTasks is managed below by a combined effect that
  // considers jobs, rfps and bids together so we don't set it here.

  // Fetch RFPs and their bids, map them to tasks with distinct colors
  const { data: rfpsData } = useQuery(GET_RFPS);

  const [groupBy, setGroupBy] = useState<'type' | 'company'>('type');
  const [chartKey, setChartKey] = useState<number>(0);
  const [activeViewMode, setActiveViewMode] = useState<ViewMode>(ViewMode.MONTH);

  const handleGroupByChange = (value: 'type' | 'company') => {
    // clear existing tasks immediately so old chart is removed
    setInternalTasks([]);
    // bump key to force Gantt remount
    setChartKey(k => k + 1);
    setGroupBy(value);
  };

  useEffect(() => {
    let mounted = true;
    async function fetchRfpsAndBids() {
      const rfps = rfpsData?.rfps ?? [];

      // Build RFP tasks synchronously (no bids yet)
      const rfpTasks: Task[] = rfps.map((r: any) => {
        const parsedStart = parseDate(r.startDate);
        const start = parsedStart ?? new Date();
        const parsedEnd = parseDate(r.bidsDueDate);
        const end = parsedEnd ?? addDays(start, 1);
        const t: any = {
          id: `rfp-${r.id}`,
          name: r.title ?? `RFP ${r.id}`,
          startDate: start,
          endDate: end,
          color: '#ef4444',
          percent: 0,
        } as Task;
        t.company = r.originalCompany ?? 'Unknown Company';
        return t as Task;
      });

      // Prepare job tasks synchronously
      const jobTasks: any[] = [];
      if (mappedFromJobs && mappedFromJobs.length > 0) {
        mappedFromJobs[0].tasks.forEach(t => jobTasks.push(t as any));
      }

      // Immediately replace internalTasks with the chosen grouping (without bids yet)
      if (groupBy === 'type') {
        const groups: TaskGroup[] = [];
        if (mappedFromJobs) groups.push(...mappedFromJobs);
        groups.push({ id: 'rfps-group', name: 'RFPs', tasks: rfpTasks });
        setInternalTasks(groups);
      } else {
        // build company groups from jobs + rfps (bids will be added later)
        const map: Record<string, Task[]> = {};
        const pushTo = (company: string, task: Task) => {
          if (!map[company]) map[company] = [];
          map[company].push(task);
        };
        jobTasks.forEach((t: any) => pushTo(t.company ?? 'Unknown Company', t));
        rfpTasks.forEach((t: any) => pushTo((t as any).company ?? 'Unknown Company', t));
        const groups: TaskGroup[] = Object.keys(map).sort().map((company) => ({
          id: `company-${company.replace(/\s+/g, '-').toLowerCase()}`,
          name: company,
          tasks: map[company],
        }));
        setInternalTasks(groups.length > 0 ? groups : (mappedFromJobs ?? []));
      }

      // Now fetch bids asynchronously and update groups if still mounted and grouping matches
      const bidsTasks: Task[] = [];
      if (rfps.length > 0) {
        await Promise.all(
          rfps.map(async (r: any) => {
            try {
              const res = await apolloClient.query({ query: GET_BIDS_FOR_RFP, variables: { rfpId: Number(r.id) } });
              const bids = res?.data?.bidsForRFP || [];
              bids.forEach((b: any) => {
                const parsedStart = parseDate(b.expectedDate);
                const start = parsedStart ?? new Date();
                const end = addDays(start, 1);
                const bt: any = {
                  id: `bid-${b.id}`,
                  name: b.title ?? `Bid ${b.id}`,
                  startDate: start,
                  endDate: end,
                  color: '#f59e0b', // yellow
                  percent: 0,
                } as Task;
                bt.company = b.company ?? 'Unknown Company';
                bidsTasks.push(bt as Task);
              });
            } catch (e) {
              // ignore per-rfp failures
            }
          })
        );
      }

      if (!mounted) return;

      // After bids were fetched, merge them into the current grouping if the grouping hasn't changed
      if (bidsTasks.length > 0) {
        if (groupBy === 'type') {
          const groups: TaskGroup[] = [];
          if (mappedFromJobs) groups.push(...mappedFromJobs);
          groups.push({ id: 'rfps-group', name: 'RFPs', tasks: rfpTasks });
          groups.push({ id: 'bids-group', name: 'Bids', tasks: bidsTasks });
          setInternalTasks(groups);
        } else {
          // add bids to company grouping
          const map: Record<string, Task[]> = {};
          const pushTo = (company: string, task: Task) => {
            if (!map[company]) map[company] = [];
            map[company].push(task);
          };
          jobTasks.forEach((t: any) => pushTo(t.company ?? 'Unknown Company', t));
          rfpTasks.forEach((t: any) => pushTo((t as any).company ?? 'Unknown Company', t));
          bidsTasks.forEach((t: any) => pushTo((t as any).company ?? 'Unknown Company', t));

          const groups: TaskGroup[] = Object.keys(map).sort().map((company) => ({
            id: `company-${company.replace(/\s+/g, '-').toLowerCase()}`,
            name: company,
            tasks: map[company],
          }));
          setInternalTasks(groups.length > 0 ? groups : (mappedFromJobs ?? []));
        }
      }
    }

    fetchRfpsAndBids();
    return () => {
      mounted = false;
    };
  }, [rfpsData, mappedFromJobs, groupBy]);

  const handleTaskUpdate = (groupId: string, updatedTask: Task) => {
    setInternalTasks(prevTasks =>
      prevTasks.map(group =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
            }
          : group
      )
    );
  };

  // Compute timeline bounds — week mode uses a fixed 2-month window around today
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();

    if (activeViewMode === ViewMode.WEEK) {
      // Fixed window: 2 months before and after today, snapped to Sundays
      return {
        startDate: startOfWeek(subMonths(now, 2), { weekStartsOn: 0 }),
        endDate: addDays(startOfWeek(addMonths(now, 2), { weekStartsOn: 0 }), 7),
      };
    }

    // For other view modes, fit to task data with padding
    const groups = props.tasks ?? internalTasks;
    const allDates: Date[] = [];
    groups.forEach(g => g.tasks.forEach(t => {
      if (t.startDate) allDates.push(new Date(t.startDate));
      if (t.endDate) allDates.push(new Date(t.endDate));
    }));

    if (allDates.length === 0) {
      return {
        startDate: subMonths(now, 2),
        endDate: addMonths(now, 2),
      };
    }

    const minTs = Math.min(...allDates.map(d => d.getTime()));
    const maxTs = Math.max(...allDates.map(d => d.getTime()));
    const minDate = new Date(minTs);
    const maxDate = new Date(maxTs);

    return {
      startDate: props.startDate ?? subMonths(minDate, 1),
      endDate: props.endDate ?? addMonths(maxDate, 3),
    };
  }, [props.tasks, internalTasks, props.startDate, props.endDate, activeViewMode]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
        <Typography variant="h6">Project Timeline</Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="group-by-label">Group By</InputLabel>
          <Select
            labelId="group-by-label"
            value={groupBy}
            label="Group By"
            onChange={(e) => handleGroupByChange(e.target.value as 'type' | 'company')}
          >
            <MenuItem value="type">Type (Jobs / RFPs / Bids)</MenuItem>
            <MenuItem value="company">Company</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Gantt
        key={chartKey} // force remount when grouping changes so old tasks are removed
        tasks={props.tasks ?? internalTasks}
        onTaskUpdate={handleTaskUpdate}
        darkMode={isDark}
        showProgress={false}
        editMode={true}
        startDate={startDate}
        endDate={endDate}
        viewModes={[ViewMode.WEEK, ViewMode.MONTH, ViewMode.QUARTER, ViewMode.YEAR]}
        onViewModeChange={(mode: ViewMode) => setActiveViewMode(mode)}
        renderTimelineHeader={(headerProps: TimelineHeaderRenderProps) => {
          if (headerProps.viewMode === ViewMode.WEEK) {
            // timeUnits are now Sunday-aligned since startDate is snapped to Sunday
            const weekEntries = headerProps.timeUnits.map((date) => ({
              date,
              label: format(date, 'dd MMM'),
            }));

            // Group consecutive weeks by month for the higher-level header
            const monthGroups: { label: string; span: number }[] = [];
            weekEntries.forEach(({ date }) => {
              const monthLabel = format(date, 'MMM yyyy');
              const last = monthGroups[monthGroups.length - 1];
              if (last && last.label === monthLabel) {
                last.span++;
              } else {
                monthGroups.push({ label: monthLabel, span: 1 });
              }
            });

            return (
              <div
                className="rmg-timeline"
                style={{ '--gantt-unit-width': `${headerProps.unitWidth}px` } as React.CSSProperties}
                data-rmg-component="timeline"
                data-view-mode="week"
              >
                <div className="rmg-timeline-header-higher" data-rmg-component="timeline-header-higher">
                  {monthGroups.map((group, i) => (
                    <div
                      key={`higher-${i}`}
                      className="rmg-timeline-unit"
                      style={{ width: `${group.span * headerProps.unitWidth}px` }}
                      data-rmg-component="timeline-unit-higher"
                    >
                      {group.label}
                    </div>
                  ))}
                </div>
                <div className="rmg-timeline-header" data-rmg-component="timeline-header">
                  {weekEntries.map(({ label }, i) => (
                    <div
                      key={`week-${i}`}
                      className={`rmg-timeline-unit${i === headerProps.currentUnitIndex ? ' rmg-timeline-unit-current' : ''}`}
                      style={{ width: `${headerProps.unitWidth}px` }}
                      data-rmg-component="timeline-unit"
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // For non-week modes, use the library's default Timeline component
          return (
            <Timeline
              months={headerProps.timeUnits}
              currentMonthIndex={headerProps.currentUnitIndex}
              locale={headerProps.locale}
              viewMode={headerProps.viewMode}
              unitWidth={headerProps.unitWidth}
            />
          );
        }}
      />
    </Box>
  );
}