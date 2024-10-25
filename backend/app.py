import csv
from flask import Flask, jsonify, request, make_response

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    response = {
        'total_vcores': 16,
        'total_memory': 64,
        'total_storage': 256,
        'license_count': 4
    }
    return jsonify(response)

@app.route('/download-csv', methods=['POST'])
def download_csv():
    calculations = {
        'Total vCores': 16,
        'Total Memory (GB)': 64,
        'Total Storage (GB)': 256,
        'License Count': 4
    }
    csv_output = []
    csv_output.append(['Description', 'Value'])
    for key, value in calculations.items():
        csv_output.append([key, value])
    si = csv.StringIO()
    csv_writer = csv.writer(si)
    csv_writer.writerows(csv_output)
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=sizing_details.csv"
    output.headers["Content-type"] = "text/csv"
    return output

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
