package com.jobtracker.backend.repository;

import com.jobtracker.backend.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {
}
