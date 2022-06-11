import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes
} from "react-router-dom"

function Sidebar() {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar
                    padding="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 500, lg: 400 }}
                >
                    <Navbar.Section>
                        <Text>Hello this is title</Text>
                    </Navbar.Section>
                    <Navbar.Section grow mt="lg">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text component={Link} variant="link" to="/Home">
                                Home page
                            </Text>
                            <Text component={Link} variant="link" to="/CreateIssue">
                                Create issue page
                            </Text>
                            <Text component={Link} variant="link" to="/Issue">
                                Issue page
                            </Text>
                        </div>
                    </Navbar.Section>
                    <Navbar.Section>
                        <text>Footer</text>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={50} padding="md">
                    {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Text>Application header</Text>


                    </div>
                </Header>
            }
        >

        </AppShell>
    )
}

export default Sidebar;