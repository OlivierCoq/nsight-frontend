
const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log('post_data', post_data);
    const eventStream = createEventStream(event)
  
    const interval = setInterval(async () => {
      await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`)
    }, 1000)
    
    eventStream.onClosed(async () => {
      clearInterval(interval)
      await eventStream.close()
    })
    
    return eventStream.send()
})

