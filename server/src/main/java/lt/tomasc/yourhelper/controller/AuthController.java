package lt.tomasc.yourhelper.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lt.tomasc.yourhelper.service.MainPageAdminService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;


@RestController
public class AuthController {


    @Value("${ALLOWED_IPS}")
    private String[] allowedIps;

    @Value("${ADMIN_TOKEN}")
    private String adminToken;

    @GetMapping("/api/auth/check-ip")
    public Map<String,Boolean> checkIp(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        boolean isAllowedIp = Arrays.asList(allowedIps).contains(clientIp);
        return Collections.singletonMap("isPossibleAdmin", isAllowedIp);
    }

    @GetMapping("/api/auth/check-admin")
    public Map<String, Boolean> checkAdmin(HttpServletRequest request, HttpServletResponse response) {
        String clientIpAddress = request.getRemoteAddr();
        String requestToken = request.getHeader("Admin-Token");

        boolean isAllowedIp = Arrays.asList(allowedIps).contains(clientIpAddress);
        boolean hasValidToken = adminToken.equals(requestToken);

        boolean isAdmin = hasValidToken && isAllowedIp;

        if (isAdmin) {
            Cookie adminCookie = new Cookie("Admin-Token", adminToken);
            adminCookie.setPath("/");
            adminCookie.setHttpOnly(true);
            adminCookie.setSecure(false);
            adminCookie.setMaxAge(7 * 24 * 60 * 60);

            response.addCookie(adminCookie);
        }

        return Collections.singletonMap("isAdmin", isAdmin);
    }

}
