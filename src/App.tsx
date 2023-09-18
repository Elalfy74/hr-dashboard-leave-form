import { ThemeProvider } from './ThemeProvider';
import { LeaveForm } from './components/leave-form';
import { useDepartments } from './hooks/use-departments';

export default function App() {
  const departments = useDepartments();

  return <ThemeProvider>{departments && <LeaveForm departments={departments} />}</ThemeProvider>;
}
