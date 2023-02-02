<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RecoveryMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $content;

    public function __construct($content)
    {
        $this->content = $content;
    }

    public function build()
    {
        return $this->from('hello@example.com')
                    ->subject('Recuperación de contraseña')
                    ->view('view.name')
                    ->with([
                        'content' => $this->content
                    ])
                    ->text('emails.recovery')
                    ->with([
                        'content' => $this->content
                    ])
                    ->markdown('emails.recovery')
                    ->with([
                        'content' => $this->content
                    ])
                    ->to($this->content);
    }
}
