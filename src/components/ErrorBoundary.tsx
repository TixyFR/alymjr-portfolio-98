import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
          <Card className="max-w-lg w-full glass">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Oops ! Une erreur s'est produite</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Quelque chose s'est mal passé. Vous pouvez essayer de recharger la page ou réessayer.
              </p>
              
              {this.state.error && (
                <details className="text-left bg-muted/50 p-4 rounded-lg">
                  <summary className="cursor-pointer font-medium">Détails de l'erreur</summary>
                  <pre className="mt-2 text-sm text-red-500 whitespace-pre-wrap">
                    {this.state.error.message}
                  </pre>
                </details>
              )}

              <div className="flex gap-2 justify-center pt-4">
                <Button onClick={this.handleRetry} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réessayer
                </Button>
                <Button onClick={this.handleReload} className="bg-gradient-primary">
                  Recharger la page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;