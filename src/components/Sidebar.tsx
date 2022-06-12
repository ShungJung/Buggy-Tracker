import { Navbar, Text } from '@mantine/core';
import { Link } from "react-router-dom";
import { faDiagramProject, faTicket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    return (
        <Navbar
            hiddenBreakpoint="sm"
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
    )
}

export default Sidebar;