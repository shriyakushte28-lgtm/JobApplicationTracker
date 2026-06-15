package com.jobtracker.backend.controller;

import com.jobtracker.backend.model.Job;
import com.jobtracker.backend.repository.JobRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return "Job deleted successfully";
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {

        Job job = jobRepository.findById(id).orElse(null);

        if (job == null) {
            return null;
        }

        job.setCompanyName(updatedJob.getCompanyName());
        job.setJobRole(updatedJob.getJobRole());
        job.setApplicationDate(updatedJob.getApplicationDate());
        job.setStatus(updatedJob.getStatus());
        job.setJobLink(updatedJob.getJobLink());
        job.setNotes(updatedJob.getNotes());

        return jobRepository.save(job);
    }
}