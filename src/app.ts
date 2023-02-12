import initialize from './server'

const main = async () => {
	const port = process.env['PORT'] ?? 3000
//vai buscar ao ambiente e se não existir cria a rota 
	const server = await initialize({port})
	void await server.start()
}

void main()
