package com.jobtracker.backend.controller;

import com.jobtracker.backend.model.Resume;
import com.jobtracker.backend.repository.ResumeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "https://job-application-tracker-livid-chi-80.vercel.app"
})
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

    @PostMapping("/upload")
    public String uploadResume(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        String uploadDir =
                System.getProperty("user.dir") + "/uploads/";

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath =
                uploadDir + file.getOriginalFilename();

        file.transferTo(new File(filePath));

        Resume resume = new Resume();

        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(filePath);
        resume.setUploadDate(LocalDate.now().toString());

        resumeRepository.save(resume);

        return "Resume uploaded successfully!";
    }

    @GetMapping
    public java.util.List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }
}