import { Header } from "@mantine/core";

const AppHeader = () => {
    return (
        <Header height={50}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h1>Buggy-Tracker</h1>
            </div>
        </Header>
    )
}

export default AppHeader