<?php

namespace App\Http\Controllers;

use Validator;
use App\Ticket;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Illuminate\Http\Request;

class TicketController extends Controller
{
    // use Notifiable;
    public function showAllTickets()
    {
        $tickets = Ticket::all();

        $response = [
            'status' => 'success',
            'message' => 'Ticket list.',
            'data' => $tickets
        ];

        return response()->json($response, 200);
    }

    public function create(Request $request)
    {
        $validate = $this->validate($request, [
            'name' => 'required'
        ]);

        $ticket = Ticket::create($request->all());
        
        if ($ticket) {
            $response = [
                'status' => 'success',
                'message' => 'Ticket has been successfully created.',
                'data' => $ticket
            ];
        }
        
        return response()->json($response, 201);
    }

    public function update($id, Request $request)
    {

        $ticket = Ticket::findOrFail($id);
        
        $ticketResponse = $ticket->update($request->all());
        
        if ($ticketResponse) {
            $response = [
                'status' => 'success',
                'message' => "Ticket has been successfully updated.",
            ];

            return response()->json($response, 200);
        }

        $response = [
            'status' => 'failed',
            'message' => 'Ticket could not be update.',
            'data' => $ticketResponse
        ];

        return response()->json($response, 404);
    }

    public function delete($id)
    {
        Ticket::findOrFail($id)->delete();

        $response = [
            'status' => 'success',
            'message' => "Ticket has been deleted successfully.",
        ];

        return response($response, 200);
    }
}