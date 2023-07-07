<?php


namespace App\Repositories\Web;


use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendOrderForm extends Mailable
{
    use Queueable, SerializesModels;

    public $fields;
    public $total;

    /**
     * Create a new message instance.
     * @param $fields array should contain keys: to, from, subject, message
     */
    public function __construct($fields,$idd)
    {
        $this->fields = $fields;
        if(empty($idd)) {$idd='876';}
        $this->iddata = $idd;

//        if ($this->fields['userForm']['email']) {
//            $this->to($this->fields['userForm']['email']);
//        }

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
//            ->to('angelorlov@gmail.com')
            ->from(env('EMAIL_FROM'))
			->subject('ДЕКОР - РЕТРО - заказ N '.$this->iddata.' от '.$this->fields['userForm']['name'])
            ->view('mails.order')->with('iddata', $this->iddata);
    }
}
