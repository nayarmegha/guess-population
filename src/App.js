import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Population from "./Population";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#252b36",
    },
    text: {
      primary: "#FFFFFF",
    },
    primary: {
      main: "#2b56d6",
      dark: "#252b36",
    },
    secondary: {
      main: "#abe444",
    },
  },
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 28,
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Container maxWidth="md" justifyContent="center" sx={{ pt: 15 }}>
          <p>
            <b> 🤓🌍🤓 ⁉️ Which city is bigger by population ⁉️ 🤓🌍🤓</b>
          </p>
          <Population />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
