package lt.tomasc.yourhelper.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Value("${ALLOWED_IPS}")
    private String[] allowedIps;

    @Value("${ADMIN_TOKEN}")
    private String adminToken;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return
                http
                        .cors(Customizer.withDefaults())
                        .authorizeHttpRequests(auth -> auth
                                .requestMatchers(HttpMethod.GET,"/api/main/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/main/image").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/auth/check-admin").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/auth/check-ip").permitAll()
                                .requestMatchers("/api/${ADMIN_ROUTE}/**").access(this.hasIpAddressAndAdminToken())
                                .anyRequest().authenticated())
                        .formLogin(AbstractHttpConfigurer::disable)
                        .exceptionHandling(e -> e
                                .accessDeniedHandler(((request, response, accessDeniedException) -> {
                                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                                    response.getWriter().write("Access Denied: IP not authorized");
                                })))
                        .build();

    }

    private AuthorizationManager<RequestAuthorizationContext> hasIpAddressAndAdminToken() {
        return (authentication, context) -> {
            HttpServletRequest request = context.getRequest();

            String clientIp = request.getRemoteAddr();
            boolean isAllowedIp = Arrays.asList(allowedIps).contains(clientIp);

            String headerToken = request.getHeader("Admin-Token");
            String cookieToken = null;

            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("Admin-Token".equals(cookie.getName())) {
                        cookieToken = cookie.getValue();
                        break;
                    }
                }
            }
            boolean hasValidToken = adminToken.equals(headerToken) || adminToken.equals(cookieToken);

            return new AuthorizationDecision(isAllowedIp && hasValidToken);
        };
    }
}


