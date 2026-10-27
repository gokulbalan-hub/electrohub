package com.training.electriccircuit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.electriccircuit.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}	