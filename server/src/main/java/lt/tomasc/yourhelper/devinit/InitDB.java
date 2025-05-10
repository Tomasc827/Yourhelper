package lt.tomasc.yourhelper.devinit;

import lt.tomasc.yourhelper.model.MainPageImage;
import lt.tomasc.yourhelper.repo.MainPageImageRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Configuration
public class InitDB {
    private final MainPageImageRepo mainPageImageRepo;

    public InitDB(MainPageImageRepo mainPageImageRepo) {
        this.mainPageImageRepo = mainPageImageRepo;
    }

    @Bean
    public CommandLineRunner init() {
        return (args) -> {
            if (mainPageImageRepo.count() == 0) {
                try {
                    ClassPathResource classPathResource = new ClassPathResource("static/herosection.png");
                    byte[] bytes = Files.readAllBytes(classPathResource.getFile().toPath());

                    MainPageImage img = new MainPageImage();
                    img.setFilename("herosection.png");
                    img.setContentType("image/png");
                    img.setData(bytes);
                    img.setFileSize((long) bytes.length);

                    mainPageImageRepo.save(img);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        };
    }
}
