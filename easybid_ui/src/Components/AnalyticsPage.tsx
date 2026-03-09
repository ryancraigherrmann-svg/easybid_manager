import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { GET_ANALYTICS } from '../graphql/analytics';

type Range = '4w' | '8w' | '12w' | '26w' | '52w';

const RANGE_WEEKS: Record<Range, number> = {
  '4w': 4,
  '8w': 8,
  '12w': 12,
  '26w': 26,
  '52w': 52,
};

function dateRange(weeks: number) {
  const end = new Date();
  const start = new Date(end.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

const currencyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface WeekBucket {
  weekStart: string;
  weekLabel: string;
  count: number;
  totalAmount: number;
}

interface Summary {
  totalRFPs: number;
  totalBids: number;
  totalJobs: number;
  totalBidAmount: number;
  totalJobValue: number;
  pendingBidAmount: number;
}

/* ─── Stat Card ─── */
function StatCard({ label, value, subLabel, subValue }: {
  label: string;
  value: string | number;
  subLabel?: string;
  subValue?: string;
}) {
  return (
    <Paper elevation={2} sx={{ p: 2.5, flex: 1, minWidth: 180 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {value}
      </Typography>
      {subLabel && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {subLabel}: <strong>{subValue}</strong>
        </Typography>
      )}
    </Paper>
  );
}

/* ─── RFPs by Status Chart ─── */
function RFPsByStatusChart({ data }: {
  data: Array<{ status: number; statusLabel: string; count: number }>;
}) {
  if (!data || data.length === 0) {
    return null;
  }

  const statusColors: Record<number, string> = {
    1: '#9c27b0', // Draft - Purple
    2: '#2196f3', // Receiving Bids - Blue
    3: '#ff9800', // In Process - Orange
    4: '#4caf50', // Closed - Green
  };

  // Create series data with individual colors
  const labels = data.map((d) => d.statusLabel);
  const series = data.map((d) => ({
    data: [d.count],
    label: d.statusLabel,
    color: statusColors[d.status] || '#1976d2',
  }));

  return (
    <Paper elevation={2} sx={{ p: 2.5 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        RFPs by Status
      </Typography>
      <Box sx={{ width: '100%', height: 360 }}>
        <BarChart
          height={340}
          xAxis={[{ data: ['RFP Count'], scaleType: 'band' }]}
          series={series}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
            },
          }}
          margin={{ bottom: 80, left: 60, right: 20, top: 10 }}
        />
      </Box>
    </Paper>
  );
}

/* ─── Combined Activity Chart ─── */
function CombinedActivityChart({ rfps, bids, jobs }: {
  rfps: WeekBucket[];
  bids: WeekBucket[];
  jobs: WeekBucket[];
}) {
  const labels = rfps.map((d) => d.weekLabel);

  return (
    <Paper elevation={2} sx={{ p: 2.5 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Weekly Activity
      </Typography>
      <Box sx={{ width: '100%', height: 360 }}>
        <BarChart
          height={340}
          xAxis={[{ data: labels, scaleType: 'band', label: 'Week of' }]}
          series={[
            { data: rfps.map((d) => d.count), label: 'RFPs', color: '#1976d2' },
            { data: bids.map((d) => d.count), label: 'Bids', color: '#2e7d32' },
            { data: jobs.map((d) => d.count), label: 'Jobs', color: '#ed6c02' },
          ]}
        />
      </Box>
    </Paper>
  );
}

/* ─── Main Component ─── */
export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>('12w');

  const vars = useMemo(() => dateRange(RANGE_WEEKS[range]), [range]);

  const { data, loading, error } = useQuery(GET_ANALYTICS, {
    variables: vars,
    fetchPolicy: 'cache-and-network',
  });

  const handleRange = (_: React.MouseEvent<HTMLElement>, val: Range | null) => {
    if (val) setRange(val);
  };

  if (loading && !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        Failed to load analytics: {error.message}
      </Alert>
    );
  }

  const analytics = data?.analytics;
  const summary: Summary | undefined = analytics?.summary;

  return (
    <Box sx={{ px: 3, pb: 4, width: '100%', maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Analytics Dashboard
        </Typography>
        <ToggleButtonGroup
          value={range}
          exclusive
          onChange={handleRange}
          size="small"
          color="primary"
        >
          <ToggleButton value="4w">4 wk</ToggleButton>
          <ToggleButton value="8w">8 wk</ToggleButton>
          <ToggleButton value="12w">12 wk</ToggleButton>
          <ToggleButton value="26w">6 mo</ToggleButton>
          <ToggleButton value="52w">1 yr</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Summary Cards */}
      {summary && (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <StatCard label="RFPs Created" value={summary.totalRFPs} />
          <StatCard
            label="Bids Submitted"
            value={summary.totalBids}
            subLabel="Total value"
            subValue={currencyFmt.format(summary.totalBidAmount)}
          />
          <StatCard
            label="Pending Bids"
            value={currencyFmt.format(summary.pendingBidAmount)}
            subLabel="Awaiting approval"
          />
          <StatCard label="Jobs Approved" value={summary.totalJobs} />
        </Stack>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Charts */}
      <Stack spacing={3}>
        <CombinedActivityChart
          rfps={analytics?.rfps ?? []}
          bids={analytics?.bids ?? []}
          jobs={analytics?.jobs ?? []}
        />

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <RFPsByStatusChart data={analytics?.rfpsByStatus ?? []} />
          </Box>

          {/* Awardee Pie Chart */}
          {(analytics?.awardees?.length ?? 0) > 0 && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Paper elevation={2} sx={{ p: 2.5, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  RFP Awardees by Company
                </Typography>
                <Box sx={{ width: '100%', height: 340, display: 'flex', justifyContent: 'center' }}>
                  <PieChart
                    height={320}
                    series={[
                      {
                        data: (analytics?.awardees ?? []).map((a: any, i: number) => ({
                          id: i,
                          value: a.count,
                          label: a.company,
                        })),
                        highlightScope: { fade: 'global', highlight: 'item' },
                        innerRadius: 40,
                        paddingAngle: 2,
                        cornerRadius: 4,
                      },
                    ]}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
