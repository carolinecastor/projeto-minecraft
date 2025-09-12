import { supabase } from '../config/supabase.js'

export const chatService = {
  // Buscar mensagens do chat
  async getMessages() {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50) // Limitar a 50 mensagens mais recentes
      
      if (error) {
        console.error('Erro ao buscar mensagens:', error)
        return []
      }
      
      return data || []
    } catch (error) {
      console.error('Erro na busca de mensagens:', error)
      return []
    }
  },

  // Enviar nova mensagem
  async sendMessage(playerName, content) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            player_name: playerName,
            content: content
          }
        ])
        .select()
      
      if (error) {
        console.error('Erro ao enviar mensagem:', error)
        return null
      }
      
      return data?.[0] || null
    } catch (error) {
      console.error('Erro no envio da mensagem:', error)
      return null
    }
  },

  // Inscrever-se em atualizações em tempo real
  subscribeToMessages(callback) {
    try {
      const subscription = supabase
        .channel('chat_messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages'
          },
          (payload) => {
            console.log('Nova mensagem recebida:', payload.new)
            callback(payload.new)
          }
        )
        .subscribe()
      
      return subscription
    } catch (error) {
      console.error('Erro ao criar subscription:', error)
      return null
    }
  },

  // Cancelar subscription
  unsubscribe(subscription) {
    if (subscription) {
      supabase.removeChannel(subscription)
    }
  },

  // Enviar indicador de digitação
  sendTypingIndicator(playerName, isTyping) {
    try {
      const channel = supabase.channel('typing-indicators')
      channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { 
          player_name: playerName, 
          is_typing: isTyping,
          timestamp: Date.now()
        }
      })
      return true
    } catch (error) {
      console.error('Erro ao enviar indicador de digitação:', error)
      return false
    }
  },

  // Inscrever-se em indicadores de digitação
  subscribeToTypingIndicators(callback) {
    try {
      const subscription = supabase
        .channel('typing-indicators')
        .on('broadcast', { event: 'typing' }, (payload) => {
          console.log('Indicador de digitação recebido:', payload)
          callback(payload.payload)
        })
        .subscribe()
      
      return subscription
    } catch (error) {
      console.error('Erro ao criar subscription de digitação:', error)
      return null
    }
  },

  // Formatar mensagem para o formato do chat local
  formatMessage(dbMessage) {
    const date = new Date(dbMessage.created_at)
    const time = date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    return {
      id: dbMessage.id,
      time: time,
      player: dbMessage.player_name,
      content: dbMessage.content,
      color: "text-cyan-400"
    }
  }
}