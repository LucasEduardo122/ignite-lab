import {Route, Routes} from 'react-router-dom'
import Event from './pages/Event';
import Subscribe from './pages/Subscribe';

export default function Router() {
    return(
        <Routes>
            <Route path="/" element={<Event />}/>
            <Route path="/subscriber" element={<Subscribe />}/>
            <Route path="/event" element={<Event />}/>
            <Route path="/event/lesson/:slug" element={<Event />}/>
        </Routes>
    )
}