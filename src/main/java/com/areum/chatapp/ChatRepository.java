package com.areum.chatapp;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;


public interface ChatRepository extends ReactiveMongoRepository<Chat,String> {

    //tailable을 사용하면 버퍼 사이즈가 커져야해서? cmd에서 사용하는 db로 들어가서 //db.runCommand({convertToCapped:'chat', size:8192}) 해줘야한다. chat은 url 주소인듯?
    @Tailable
    @Query("{sender:?0,receiver:?1}")
    Flux<Chat> mFindBySender(String sender, String receiver); //Flux는 흐름을 가지고 response를 유지하면서 데이터를 계속 흘려보낼 수 있다.

}
