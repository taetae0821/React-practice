import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';

function PromiseMain() {

    const events = [
        { title: 'Sample Event', date: new Date() },
    ];

    return (
        <div>
            <Link to="">←약속</Link>

            <div style={{ width: '700px', margin: '0 auto' }}>
                <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                locale={koLocale}
            />
            </div>
        </div>
    );
}

export default PromiseMain;