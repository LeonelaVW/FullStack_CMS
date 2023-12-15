package com.cms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cms.backend.model.Manager;



@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

}