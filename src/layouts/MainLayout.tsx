import Sidebar from "../components/Sidebar";
import { AppShell } from "@mantine/core";

const MainLayout = () => {
    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={<Sidebar/>}
        >
        </AppShell>
    )
}

export default MainLayout;