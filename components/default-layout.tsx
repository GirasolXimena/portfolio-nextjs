"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import styles from "../styles/layout.module.scss";
import DefaultHeader from "./default-header";
import HeaderControls from "./header-controls";
import { Anchor, AppShell, Burger, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { NAME } from "lib/data";

function DefaultLayout({ children }) {
  const segment = useSelectedLayoutSegment();
  const [opened, { toggle}] = useDisclosure()
  function Header() {
    return segment ? (
      <header className={styles.header} id="header">
        <DefaultHeader segment={segment} />
      </header>
    ) : (
      <HeaderControls segment={"home"} />
    );
  }

  const resumeLink = `${NAME.split(' ').join('-')}-resume.pdf`
  return (
    <AppShell header={{ height: 60 }} navbar={{
      width: 150,
      breakpoint: 'sm', 
      collapsed: { 
        mobile: !opened,
        desktop: !opened
      }
    }}
    padding={'md'}
    >
      <AppShell.Header display={'flex'} styles={{
        header: {
          alignItems: 'center',
          verticalAlign: 'center',
          justifyContent: 'space-evenly'
        }
      }}>
        <Burger opened={opened} onClick={toggle} size={'sm'} />
        <div>XG</div>
        <Anchor href="https://codepen.io/abstract_cod" >Labs</Anchor>
        <Button href={'assets/Ximena-Girasol-resume.pdf'} component={Link}>Resume</Button>
        <HeaderControls segment={'h'} />
      </AppShell.Header>
    <AppShell.Navbar p={'md'}>{resumeLink}</AppShell.Navbar>
    <AppShell.Main>{children}</AppShell.Main>
    {/* <div className={styles.container}>
      <Header />
      <main className={styles.content} id="main-content">
        {children}
      </main>
    </div> */}
    </AppShell>
  );
}

export default DefaultLayout;
