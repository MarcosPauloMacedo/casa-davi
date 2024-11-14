import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    
    // Verifica se o usuário está autenticado
    const isAuthenticated = request.cookies.get('auth-token');
    
    if (!isAuthenticated) {
        // Redireciona para a página de login se não estiver autenticado
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Continua com a requisição se estiver autenticado
    return NextResponse.next();
}

// Configuração do matcher para especificar rotas protegidas
export const config = {
    matcher: [
        '/usuarios/:path*',  // Protege todas as rotas sob /usuarios
        '/inicio/:path*',    // Protege todas as rotas sob /inicio
    ],
};