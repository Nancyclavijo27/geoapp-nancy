import styles from "./textarea.module.css";

export default function Textarea(props) {
  return <textarea {...props} className={styles.textarea} />;
}
