import { useState } from 'react';
import './RollingCalendar.css';

// 항상 정확히 4주(28일)만 보여주는 롤링 캘린더.
// 요일에 맞춰 정렬하지 않고, 그냥 1일부터 순서대로 28칸을 채운다.
// 라이브러리 없이 순수 React로 구현 — 이유는 아래 설명 참고.

function startOfMonth(date) {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
}

function formatYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

// events 예시 구조: [{ date: '2026-08-19', color: '#5B8DEF', highlight: true }]
function RollingCalendar({
    events = [],
    stepWeeks = 1,      // '<' '>' 클릭 시 몇 주씩 이동할지
    weeksToShow = 4,    // 항상 4주 고정 (요청사항)
    onSelectDate,
}) {
    // 이번 달 1일부터 시작 (요일 정렬/앞쪽 빈칸 없이 그냥 1일부터)
    const [rangeStart, setRangeStart] = useState(() => startOfMonth(new Date()));
    const [selected, setSelected] = useState(null);

    const totalDays = weeksToShow * 7;
    const days = Array.from({ length: totalDays }, (_, i) => {
        const d = new Date(rangeStart);
        d.setDate(d.getDate() + i);
        return d;
    });

    const eventMap = {};
    events.forEach((e) => {
        if (!eventMap[e.date]) eventMap[e.date] = [];
        eventMap[e.date].push(e);
    });

    const first = days[0];
    const last = days[days.length - 1];
    const sameMonth = first.getMonth() === last.getMonth() && first.getFullYear() === last.getFullYear();
    const headerLabel = sameMonth
        ? `${first.getFullYear()}년 ${first.getMonth() + 1}월`
        : `${first.getFullYear()}년 ${first.getMonth() + 1}월 ${first.getDate()}일 - ${last.getMonth() + 1}월 ${last.getDate()}일`;

    function shift(weeks) {
        setRangeStart((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() + weeks * 7);
            return d;
        });
    }

    const todayStr = formatYMD(new Date());

    return (
        <div className="rc-card">
            <div className="rc-header">
                <button type="button" className="rc-nav" onClick={() => shift(-stepWeeks)} aria-label="이전">‹</button>
                <span className="rc-label">{headerLabel}</span>
                <button type="button" className="rc-nav" onClick={() => shift(stepWeeks)} aria-label="다음">›</button>
            </div>

            <div className="rc-grid">
                {days.map((d) => {
                    const key = formatYMD(d);
                    const dayEvents = eventMap[key] || [];
                    const isHighlight = dayEvents.some((e) => e.highlight);
                    const isToday = key === todayStr;
                    const isSelected = key === selected;

                    return (
                        <button
                            type="button"
                            key={key}
                            className={
                                'rc-cell' +
                                (isHighlight ? ' rc-cell--highlight' : '') +
                                (isToday ? ' rc-cell--today' : '') +
                                (isSelected ? ' rc-cell--selected' : '')
                            }
                            onClick={() => {
                                setSelected(key);
                                onSelectDate && onSelectDate(key);
                            }}
                        >
                            <span className="rc-date">{d.getDate()}</span>
                            {dayEvents.length > 0 && (
                                <span className="rc-dots">
                                    {dayEvents.slice(0, 3).map((e, i) => (
                                        <span key={i} className="rc-dot" style={{ background: e.color || '#5B8DEF' }} />
                                    ))}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default RollingCalendar;