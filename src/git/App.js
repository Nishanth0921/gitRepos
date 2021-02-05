import styles from "./App.module.css";
import { useState } from "react";
import View from "./View";

function App() {
  const [userName, setUserName] = useState("");
  const [theme, setTheme] = useState("dark");
  const [getData, setGetData] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const handleSearch = () => {
    setGetData({
      ...getData,
      loading: true,
    });

    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((data) =>
        setGetData({
          ...getData,
          loading: false,
          data: data.map((item) => item.name),
        })
      )
      .catch((error) =>
        setGetData({
          ...getData,
          loading: false,
          error: true,
          data: [],
        })
      );
  };

  return (
    <>
      <h1>Pull Repos from Github </h1>{" "}
      <select
        name="dark"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>{" "}
      <div
        style={{ backgroundColor: theme === "dark" ? "#282c34" : "white" }}
        className={styles.app}
      >
        <div className={styles.appHeader}>
          <div className={styles.appItem}>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Github Username"
            />
            <button
              className={styles.button}
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>{" "}
            {getData.loading && (
              <>
                <div className={styles.loader}></div>
              </>
            )}
            {getData.error && (
              <>
                <div>Unable to fetch at this time</div>
              </>
            )}
          </div>
        </div>
        <div>
          <View repos={getData.data} userName={userName} theme={theme} />
        </div>
      </div>
    </>
  );
}

export default App;
