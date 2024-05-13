import mysql.connector
from bd import connect, runSQL
import json
from datetime import datetime

class dataController:
    def __init__(self):
        self.conn = connect()

    def getAllData(self):                 
        query = "SELECT id, JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA FROM data ORDER BY TOTAL DESC"
        result = runSQL(self.conn, query)
        response = {
            'status_code_header': 'HTTP/1.1 200 OK',
            'body': json.dumps(result)
        }
        return response

    def addData(self, entry):
        sql = "INSERT INTO data(JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA, TOTAL) VALUES (%s, %s, %s, %s, %s)"
        time_created = datetime.now().strftime('%d/%m/%y %H:%M:%S')
        cursor = self.conn.cursor()
        cursor.execute(sql, (entry['JUDET'], entry['CATEGORIE_NATIONALA'], entry['CATEGORIA_COMUNITARA'], entry['MARCA'], time_created))
        self.conn.commit()
        response = {
            'status_code_header': 'HTTP/1.1 201 CREATED',
            'body': json.dumps(entry)
        }
        return response

    def deleteData(self, entryId):
        sql = "DELETE FROM data WHERE id = %s"
        cursor = self.conn.cursor()
        cursor.execute(sql, (entryId,))
        self.conn.commit()
        response = {
            'status_code_header': 'HTTP/1.1 204 NO CONTENT',
            'body': json.dumps(entryId)
        }
        return response

    def editData(self, entryId, entry):
        sql = "UPDATE data SET JUDET = %s, CATEGORIE_NATIONALA = %s, CATEGORIA_COMUNITARA = %s, MARCA = %s, TOTAL = %s WHERE id = %s"
        time_updated = datetime.now().strftime('%d/%m/%y %H:%M:%S')
        cursor = self.conn.cursor()
        cursor.execute(sql, (entry['JUDET'], entry['CATEGORIE_NATIONALA'], entry['CATEGORIA_COMUNITARA'], entry['MARCA'], time_updated, entryId))
        self.conn.commit()
        response = {
            'status_code_header': 'HTTP/1.1 204 NO CONTENT',
            'body': json.dumps(entryId)
        }
        return response

    def getPaginatedData(self, pageNumber, pageSize):
        startIndex = (pageNumber - 1) * pageSize
        query = "SELECT id, JUDET, CATEGORIE_NATIONALA, CATEGORIA_COMUNITARA, MARCA FROM data ORDER BY TOTAL DESC LIMIT %s, %s"
        cursor = self.conn.cursor()
        cursor.execute(query, (startIndex, pageSize))
        data = cursor.fetchall()
        cursor.close()

        countQuery = "SELECT COUNT(*) AS total FROM data"
        countResult = runSQL(self.conn, countQuery)
        totalRecords = countResult[0]['total']
        totalPages = totalRecords // pageSize + (1 if totalRecords % pageSize else 0)

        response = {
            'status_code_header': 'HTTP/1.1 200 OK',
            'body': json.dumps({
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'totalRecords': totalRecords,
                'totalPages': totalPages,
                'data': data
            })
        }
        return response