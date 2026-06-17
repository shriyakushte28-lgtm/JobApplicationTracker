package com.jobtracker.backend.repository;

import com.jobtracker.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByUserEmail(String userEmail);

}