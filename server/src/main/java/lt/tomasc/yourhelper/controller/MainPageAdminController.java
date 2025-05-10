package lt.tomasc.yourhelper.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lt.tomasc.yourhelper.dto.MainPageImageRequest;
import lt.tomasc.yourhelper.service.MainPageAdminService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/${ADMIN_ROUTE}")
public class MainPageAdminController {

    private final MainPageAdminService mainPageAdminService;

    public MainPageAdminController(MainPageAdminService mainPageAdminService) {
        this.mainPageAdminService = mainPageAdminService;
    }

    @PutMapping(value = "/main-image",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> changeMainPageImage(@Valid @ModelAttribute MainPageImageRequest request) {
        return ResponseEntity.ok().build();
    }
}
