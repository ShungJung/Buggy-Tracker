import { useState } from 'react';
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes
} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagramProject, faTicket, faPlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbar={
                <Navbar
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 300, lg: 200 }}
                >
                    <Navbar.Section>
                        <Text>Content</Text>
                    </Navbar.Section>
                    <Navbar.Section grow mt="lg">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Text component={Link} variant="link" to="/Home">
                                <FontAwesomeIcon icon={faDiagramProject} />
                            </Text>
                            <Text component={Link} variant="link" to="/Issue">
                                <FontAwesomeIcon icon={faTicket} />
                            </Text>
                            <Text component={Link} variant="link" to="/Createissue">
                                <FontAwesomeIcon icon={faPlus} />
                            </Text>
                        </div>
                    </Navbar.Section>
                    <Navbar.Section>
                        <text>SJ</text>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={50}>
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
                        <Text>Buggy-Tracker</Text>


                    </div>
                </Header>
            }
        >

        </AppShell>
    )
}

export default Sidebar;