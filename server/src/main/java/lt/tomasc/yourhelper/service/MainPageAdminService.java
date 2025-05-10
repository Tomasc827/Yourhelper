package lt.tomasc.yourhelper.service;

import lt.tomasc.yourhelper.dto.MainPageImageRequest;
import lt.tomasc.yourhelper.dto.MainPageMapper;
import lt.tomasc.yourhelper.model.MainPageImage;
import lt.tomasc.yourhelper.repo.MainPageImageRepo;
import lt.tomasc.yourhelper.repo.MainPageRepo;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MainPageAdminService {
    private final MainPageRepo mainPageRepo;
    private final MainPageImageRepo mainPageImageRepo;

    public MainPageAdminService(MainPageRepo mainPageRepo, MainPageImageRepo mainPageImageRepo) {
        this.mainPageRepo = mainPageRepo;
        this.mainPageImageRepo = mainPageImageRepo;
    }

    public void changeMainPageImage(MainPageImageRequest request) throws IOException {
        MainPageImage mainPageImage = MainPageMapper.toEntity(request);
        mainPageImage.setId(1L);
        mainPageImageRepo.save(mainPageImage);
    }
}
