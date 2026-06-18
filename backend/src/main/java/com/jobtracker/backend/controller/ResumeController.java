package com.jobtracker.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174", "https://job-application-tracker-livid-chi-80.vercel.app"
})
public class ResumeController {

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("file") MultipartFile file)
            throws IOException {

        String uploadDir = System.getProperty("user.dir") + "/uploads/";

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = uploadDir + file.getOriginalFilename();
        
        System.out.println("Saving to: " + filePath);

        file.transferTo(new File(filePath));

        return "Resume uploaded successfully!";
    }
}