from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir frontend acessar a API

# Mock de consulta por CPF
@app.route('/api/status', methods=['POST'])
def consultar_status():
    data = request.json
    cpf = data.get('cpf')

    # Simulando dados de resposta
    respostas = {
        '12345678900': {'status': 'Em andamento', 'previsao': '20/05/2025'},
        '11122233344': {'status': 'Finalizado', 'previsao': '10/05/2025'}
    }

    resposta = respostas.get(cpf, {'status': 'Não encontrado', 'previsao': '-'})
    return jsonify(resposta)

if __name__ == '__main__':
    app.run(debug=True)
