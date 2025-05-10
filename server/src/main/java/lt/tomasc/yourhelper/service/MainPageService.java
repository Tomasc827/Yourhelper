package lt.tomasc.yourhelper.service;

import lt.tomasc.yourhelper.dto.MainPageImageResponse;
import lt.tomasc.yourhelper.dto.MainPageMapper;
import lt.tomasc.yourhelper.dto.MainPageResponse;
import lt.tomasc.yourhelper.exception.MainPageException;
import lt.tomasc.yourhelper.exception.NotFoundException;
import lt.tomasc.yourhelper.model.MainPageImage;
import lt.tomasc.yourhelper.repo.MainPageImageRepo;
import lt.tomasc.yourhelper.repo.MainPageRepo;
import org.springframework.stereotype.Service;

/**
 * All publicly available methods for visitors to
 * getMainPages gets the contents of the main page, id is necessary for multiple languages, throws exception if selected id is higher than count
 */
@Service
public class MainPageService {

    private final MainPageRepo mainPageRepo;
    private final MainPageImageRepo mainPageImageRepo;

    public MainPageService(MainPageRepo mainPageRepo, MainPageImageRepo mainPageImageRepo) {
        this.mainPageRepo = mainPageRepo;
        this.mainPageImageRepo = mainPageImageRepo;
    }

    public MainPageResponse getMainPage(Long id) {
        System.out.println(mainPageRepo.count());
        if (mainPageRepo.count() < id || id < 0) {
            throw new MainPageException("Id does not match any language for main page");
        }
        return mainPageRepo.findById(id).map(MainPageMapper::toDTO).orElseThrow();
    }

    public MainPageImageResponse getMainPageImage() {
        MainPageImage img = mainPageImageRepo.findById(2).orElseThrow(() -> new NotFoundException("No main page image found"));
        return new MainPageImageResponse(img.getData(), img.getContentType());
    }
}
