import socket

def create_server():
    # Create a socket object
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to a specific address and port
    # server_address = ('localhost', 8080)
    server_address = ('0.0.0.0', 8000)

    server_socket.bind(server_address)

    # Listen for incoming connections
    server_socket.listen(1)
    print(f"Server listening on http://{server_address[0]}:{server_address[1]}/")

    while True:
        # Wait for a connection
        print("Waiting for a connection...")
        client_socket, client_address = server_socket.accept()
        print(f"Connection from {client_address}")

        # Receive the data from the client
        request_data = client_socket.recv(1024).decode('utf-8')
        print(f"Received data:\n{request_data}")

        # Craft a simple HTTP response
        response_data = """HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n
        <html>
        <head><title>Simple Python Web Server</title></head>
        <body>
        <h1>Hello, this is a simple web server!</h1>
        </body>
        </html>
        """

        # Send the response to the client
        client_socket.sendall(response_data.encode('utf-8'))

        # Close the connection
        client_socket.close()

if __name__ == "__main__":
    create_server()
