 
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Ошибка!</h2>
          <p>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
 