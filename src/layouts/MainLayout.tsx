import Sidebar from "../components/Sidebar";
import AppHeader from "../components/Header";
import { AppShell } from "@mantine/core";

const MainLayout = () => {
    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={<Sidebar/>}
            header={<AppHeader/>}
        >
        </AppShell>
    )
}

export default MainLayout;