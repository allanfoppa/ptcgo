# NOTES

## CREATE A MF

```shell
npm create rsbuild@latest
```

```shell
cd mf-name
```

```shell
mv src/index.tsx src/bootstrap.tsx
```

```shell
touch src/index.tsx

# and add
# import('./bootstrap');
```

```shell
pnpm i
```

## MODULE FEDERATION

Accessed [Module federation](https://module-federation.io/practice/frameworks/react/index.html) in 2025/01/13

## TYPING

The major difference between type aliases vs interfaces are that interfaces are open and type aliases are closed.

INTERFACES = OPEN  
TYPE ALIASES = CLOSED

This means you can extend an interface by declaring it a second time.

## PORTS

- SHELL: 3001
- CORE: 3002
- DASHBOARD: 3003
- LOGIN: 3004
- REGISTER: 3006
- NOT FOUND: 3099

PS: Create a .env in the future

## SOME NOTES

LAYOUT:
  ☐ HEADER
    ☐ LOGO
    ☐ NAVBAR

PAGES:
  ☐ REGISTER
    ☐ FORM
  ☐ LOGIN
    ☐ FORM
  ☐ DASHBOARD
    ☐ ?
  ☐ USER
    ☐ DECKS LIST
      ☐ DECK DETAILS
        ☐ CARDS
          ☐ MATCH RESULTS

Microfrontend packages:
  Shell:
    Application shell (layout) that renders the Header, Footer, and injects the active microfrontend.
  Core:
    Shared components (Header, Footer, Button, Input, etc.), utilities (styling, theme, API client).
  Register:
    Microfrontend for the Register page.
  Login:
    Microfrontend for the Login page.
  Dashboard:
    Microfrontend for the Dashboard page.
  User:
    Microfrontend for the User page and its sub-pages (Decks List, Deck Details, Cards).
