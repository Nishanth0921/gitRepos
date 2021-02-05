function View({ repos, userName, theme }) {
  return repos.map((item) => (
    <>
      <span style={{ color: theme === "dark" ? "white" : "black" }}>
        <a target="_blank" href={`https://github.com/${userName}/${item}`}>
          {item}
        </a>
      </span>
      <br />
    </>
  ));
}

export default View;
