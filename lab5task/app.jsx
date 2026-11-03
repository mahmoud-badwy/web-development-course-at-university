const { useState } = React;

function App() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  function addComment() {
    if (text.trim() === "") return;
    setComments([...comments, { id: Date.now(), text: text, likes: 0 }]);
    setText("");
  }

  function likeComment(id) {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  }

  return (
    <div className="container">
      <h1>Comments ({comments.length})</h1>
      <div className="form">
        <input placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} />
        <button onClick={addComment}>Post</button>
      </div>
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <div className="avatar">Y</div>
          <div>
            <strong>You</strong>
            <p>{comment.text}</p>
            <button className="like" onClick={() => likeComment(comment.id)}>♡ {comment.likes}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
