-- Prefer locally hosted logos (clearbit often blocked in browsers).
update public.recent_breaches set logo_url = case slug
  when 'chess-com-2026' then '/images/breaches/chess-com.png'
  when 'microsoft-2026' then '/images/breaches/microsoft.png'
  when 'frontier-airlines-2026' then '/images/breaches/frontier.png'
  when 'virta-health-2026' then '/images/breaches/virta-health.png'
  when 'payup-2026' then '/images/breaches/payup.png'
  when 'arizona-state-university-asu-2026' then '/images/breaches/asu.png'
  when 'vimeo-2026' then '/images/breaches/vimeo.png'
  when 'udemy-2026' then '/images/breaches/udemy.png'
  else logo_url
end,
updated_at = now()
where slug in (
  'chess-com-2026','microsoft-2026','frontier-airlines-2026','virta-health-2026',
  'payup-2026','arizona-state-university-asu-2026','vimeo-2026','udemy-2026'
);
