import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from './ThemeProvider';

import { LeaveForm } from './components/leave-form';
import { useDepartments } from './hooks/use-departments';

export default function App() {
  const departments = useDepartments();

  return (
    <ThemeProvider>
      <Notifications />
      <main>{departments && <LeaveForm departments={departments} />}</main>
    </ThemeProvider>
  );
}
