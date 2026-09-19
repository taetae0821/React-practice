import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';

import './promiseMain.css';

function PromiseMain() {

    const events = [
        { title: 'Sample Event', date: new Date() },
    ];

    return (
        <div>
            <Link to="">←약속</Link>

            <div className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    locale={koLocale}
                    height="300px"
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }}
                />
            </div>
        </div>
    );
}

export default PromiseMain;