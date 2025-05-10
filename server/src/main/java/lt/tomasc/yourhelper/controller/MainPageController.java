package lt.tomasc.yourhelper.controller;

import lt.tomasc.yourhelper.dto.MainPageImageResponse;
import lt.tomasc.yourhelper.dto.MainPageResponse;
import lt.tomasc.yourhelper.service.MainPageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main")
public class MainPageController {
    private final MainPageService mainPageService;

    public MainPageController(MainPageService mainPageService) {
        this.mainPageService = mainPageService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MainPageResponse> getMainPage(@PathVariable Long id) {
        return ResponseEntity.ok(mainPageService.getMainPage(id));
    }
    @GetMapping("/image")
    public ResponseEntity<byte[]> getMainPageImage() {
        MainPageImageResponse img = mainPageService.getMainPageImage();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(img.contentType()))
                .body(img.data());
    }
}
