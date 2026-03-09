import SignIn from './SignIn';
import EzBidLogo from './EzBidLogo';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import BarChartIcon from '@mui/icons-material/BarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';

const FEATURES = [
  {
    icon: <DescriptionIcon sx={{ fontSize: 36, color: '#7EB8DA' }} />,
    title: 'Streamlined RFP Management',
    desc: 'Create, distribute, and track Requests for Proposals from a single dashboard. No more spreadsheets or lost emails.',
  },
  {
    icon: <GavelIcon sx={{ fontSize: 36, color: '#7EB8DA' }} />,
    title: 'Bid Tracking & Comparison',
    desc: 'Collect bids from contractors in one place. Compare pricing, approve winners, and move straight to job creation.',
  },
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 36, color: '#7EB8DA' }} />,
    title: 'Visual Project Scheduling',
    desc: 'See every job, RFP, and bid on an interactive Gantt timeline. Group by type or company for instant clarity.',
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 36, color: '#7EB8DA' }} />,
    title: 'Real-Time Analytics',
    desc: 'Dashboard insights on spending, bid-to-job conversion rates, and project timelines so you can make data-driven decisions.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 36, color: '#7EB8DA' }} />,
    title: 'Team & Vendor Collaboration',
    desc: 'Manage email groups, assign company roles, and keep all stakeholders in the loop with built-in notifications.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 36, color: '#7EB8DA' }} />,
    title: 'Up and Running in Minutes',
    desc: 'Create an account, add your company, and start managing bids today. No complex setup or training required.',
  },
];

export default function AuthScreen() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', background: 'linear-gradient(145deg, #1E3A50 0%, #2C5272 50%, #3B6E8F 100%)' }}>
      {/* ===== TOP HERO: Logo + Sign-In ===== */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48, paddingBottom: 32 }}>
        <div style={{ marginBottom: 24 }}>
          <EzBidLogo size={48} />
        </div>

        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: 460, textAlign: 'center', lineHeight: 1.6, margin: '0 0 28px' }}>
          The all-in-one platform for managing RFPs, collecting bids, and tracking work items — so you can focus on building, not paperwork.
        </p>

        <SignIn />
      </div>

      {/* ===== WHY EZBIDMANAGER ===== */}
      <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 40px' }}>
          <h2 style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, marginBottom: 8, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
            Why ezbidmanager?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Stop juggling spreadsheets, emails, and phone calls. ezbidmanager gives contractors and project managers one place to handle the entire bid-to-job lifecycle.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {f.icon}
                <h3 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, margin: 0, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.92rem', margin: 0, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SCREENSHOTS / PREVIEW ===== */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px' }}>
        <h2 style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, marginBottom: 8, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
          See It in Action
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Here's a quick look at how ezbidmanager simplifies your workflow from start to finish.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Screenshot placeholder 1 */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', letterSpacing: 1 }}>
              {/* Replace with: <img src="/screenshots/rfp-dashboard.png" alt="RFP Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              [ RFP Dashboard Screenshot ]
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>RFP Dashboard</h4>
              <p style={{ color: 'rgba(255,255,255,0.65)', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>Create and manage all your RFPs with status tracking, email distribution, and bid collection in one view.</p>
            </div>
          </div>

          {/* Screenshot placeholder 2 */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', letterSpacing: 1 }}>
              {/* Replace with: <img src="/screenshots/bid-comparison.png" alt="Bid Comparison" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              [ Bid Comparison Screenshot ]
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>Bid Comparison</h4>
              <p style={{ color: 'rgba(255,255,255,0.65)', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>Review all bids side-by-side, approve the best one, and automatically create a job — all in a few clicks.</p>
            </div>
          </div>

          {/* Screenshot placeholder 3 */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', letterSpacing: 1 }}>
              {/* Replace with: <img src="/screenshots/gantt-timeline.png" alt="Gantt Timeline" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              [ Gantt Timeline Screenshot ]
            </div>
            <div style={{ padding: '16px 20px' }}>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 4px', fontWeight: 700, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>Project Timeline</h4>
              <p style={{ color: 'rgba(255,255,255,0.65)', margin: 0, fontSize: '0.88rem', lineHeight: 1.5 }}>Visualize every project on an interactive Gantt chart. Group by type or company for a clear picture of your pipeline.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM CTA ===== */}
      <div style={{ textAlign: 'center', padding: '40px 24px 64px' }}>
        <h2 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 800, marginBottom: 12, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
          Ready to streamline your bid process?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Sign up in 30 seconds — no credit card required. Start managing RFPs and bids the easy way.
        </p>
        <a href="#" onClick={(e) => { e.preventDefault(); globalThis.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'inline-block', padding: '12px 36px', background: '#7EB8DA', color: '#1E3A50', borderRadius: 8, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', cursor: 'pointer', fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
          Get Started Free
        </a>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', padding: '20px 24px', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
        © {new Date().getFullYear()} ezbidmanager — Built for contractors, by contractors.
      </div>
    </div>
  );
}
