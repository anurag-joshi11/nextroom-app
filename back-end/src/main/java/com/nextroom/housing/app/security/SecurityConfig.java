package com.nextroom.housing.app.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.List;

import static com.nextroom.housing.app.constants.Constants.*;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Custom UserDetailsManager for managing users stored in a database.
     * @param dataSource the DataSource bean
     * @return the UserDetailsManager bean
     */
    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
        jdbcUserDetailsManager.setUsersByUsernameQuery("SELECT email, password, status AS enabled FROM users WHERE email = ?");
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery("SELECT email, role FROM users WHERE email = ?");
        return jdbcUserDetailsManager;
    }

    /**
     * Configures authorization, login, logout, and CORS settings.
     * @param http the HttpSecurity object for configuration
     * @return the SecurityFilterChain bean
     */
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(withDefaults()).authorizeHttpRequests(configure -> configure
                        .requestMatchers("/login", "/swagger-ui/**", "/v3/api-docs/**", "/listings",  "/listings/{listingId}", "/users/register").permitAll()
                        .requestMatchers("/users/authenticate").hasAnyRole(ROLE_STUDENT, ROLE_LANDLORD)
                        .requestMatchers("/inquiries/**").hasRole(ROLE_STUDENT)
                        .requestMatchers("/listings/**").hasAnyRole(ROLE_LANDLORD)
                        .anyRequest().authenticated())
                .formLogin(httpSecurityFormLoginConfigurer ->
                        httpSecurityFormLoginConfigurer
                                .loginProcessingUrl("/login")
                                .successHandler((request, response, authentication) ->
                                        response.setStatus(HttpServletResponse.SC_OK))
                                .permitAll())

                .exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                        httpSecurityExceptionHandlingConfigurer
                                .authenticationEntryPoint((request, response, authException) ->
                                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
                .logout(httpSecurityLogoutConfigurer ->
                        httpSecurityLogoutConfigurer
                                .logoutUrl("/logout")
                                .invalidateHttpSession(true)
                                .deleteCookies(COOKIE_JSESSIONID)
                                .logoutSuccessHandler((request, response, authentication) ->
                                        response.setStatus(HttpServletResponse.SC_OK))
                                .permitAll()).csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    /**
     * CORS configuration to allow requests from the specified frontend domain.
     * @return the CORS configuration source bean
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(FRONTEND_ORIGIN));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
