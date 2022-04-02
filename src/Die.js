export default function Die(props) {
  const styles = {
    backgroundColor: props.on ? "#59E391" : "white",
  };

  return (
    <div
      className="die"
      style={styles}
      onClick={() => props.handleClick(props.id)}
    >
      {props.value}
    </div>
  );
}
