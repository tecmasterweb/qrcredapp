import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    
    // Remover o cookie definindo uma data de expiração no passado
    cookieStore.set('convenioToken', '', {
      expires: new Date(0),
      path: '/',
    });

    // Criar a resposta com os headers anti-cache
    const resposta = NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
    
    // Adicionar headers para evitar cache
    resposta.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    resposta.headers.set('Pragma', 'no-cache');
    resposta.headers.set('Expires', '0');
    
    return resposta;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao fazer logout' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 