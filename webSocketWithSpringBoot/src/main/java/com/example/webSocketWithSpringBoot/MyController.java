package com.example.webSocketWithSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


//@RestController
@RestController
public class MyController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // ********* WEB SOCKET LISTENER *******
    @MessageMapping("/hello")// for reading from /app/hello ... LISTENING TO /app/hello....
    @SendTo("/topic/first") // for writing to /topic/first .... i.e. this function is publisher to /topic/first....
    public String check(String name) throws Exception{
//        System.out.println("inside *****");

        return "from check function .... "+name;
    }


    //****** NORMAL REST API ******
    // ***** here we are using SimpMessagingTemplate to write to /topic/user.....
    @PostMapping("/user")
    public String user(@RequestParam("name")String name) {

        name = "through api to socket :: " + name;
        messagingTemplate.convertAndSend("/topic/first",name); // publishing to /topic/user/.....
        return "Hello from **** "+name;
    }

}
